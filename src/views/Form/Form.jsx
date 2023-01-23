import { yupResolver } from "@hookform/resolvers/yup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import classnames from "classnames";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { Button } from "../../components/Button/Button";
import { Container } from "../../components/Container/Container";
import { ErrorMsg } from "../../components/ErrorMsg/ErrorMsg";
import { Heading } from "../../components/Heading/Heading";
import successImage from "../../img/success-image.svg";
import s from "./Form.module.scss";

export const MyForm = ({ token, positions, getUsers }) => {
  const [photo, setPhoto] = useState(null);
  const [success, setSuccess] = useState(false);

  const schema = yup
    .object({
      name: yup.string().trim().required().min(2).max(60),
      email: yup
        .string()
        .email()
        .required()
        .min(2)
        .max(100)
        .matches(
          // eslint-disable-next-line no-control-regex
          /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/
        ),
      phone: yup
        .string()
        .required()
        .min(5)
        .max(30)
        .matches(
          // eslint-disable-next-line no-useless-escape
          /^[\+]{0,1}380([0-9]{9})$/,
          "Provide phone number in format +38XXXXXXXXXX"
        ),
      position_id: yup.string().required("choose position").default(""),
      image: yup
        .mixed()
        .test("required", "You need to provide a file", (value) => {
          return value && value.length !== 0;
        })
        .test("fileSize", "The file is too large", (value) => {
          return value && value[0]?.size <= 5000000;
        })

        .test("type", "Only JPG format", (value) => {
          return value && value[0]?.type === "image/jpeg";
        }),
    })
    .required();

  const defaultValues = {
    name: "",
    email: "",
    phone: "",
    position_id: 1,
    image: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    control,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm({ defaultValues, resolver: yupResolver(schema) });

  const currentImage = watch("image");

  useEffect(() => {
    imagePreview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentImage]);

  const onSubmit = (data, e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("photo", data.image[0]);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("position_id", data.position_id);

    fetch("https://frontend-test-assignment-api.abz.agency/api/v1/users", {
      method: "POST",
      body: formData,
      headers: { Token: token },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.success) {
          reset();
          setTimeout(getUsers(), 2000);
          setSuccess(true);
        } else {
          alert("something went wrong");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const imagePreview = function () {
    const image = watch("image");
    if (image[0] && !errors.image) {
      const fileReader = new FileReader();
      fileReader.onload = function (e) {
        setPhoto(e.target.result);
      };
      fileReader.readAsDataURL(image[0]);
    } else {
      setPhoto(null);
    }
  };

  return (
    <section>
      <Container>
        {!success && (
          <>
            <Heading tag="h2"> Working with POST request</Heading>
            <form onSubmit={handleSubmit(onSubmit)} className={s.wrapper}>
              <TextField
                error={errors.name}
                id="outlined-helperText"
                {...register("name")}
                type="text"
                label="Name"
              />
              <ErrorMsg error={errors?.name?.message} />
              <TextField
                error={errors.email}
                id="outlined-helperText"
                {...register("email")}
                type="text"
                label="Email"
              />
              <ErrorMsg error={errors?.email?.message} />
              <TextField
                error={errors.phone}
                id="outlined-helperText"
                {...register("phone")}
                type="text"
                label="Phone"
              />
              <ErrorMsg error={errors?.phone?.message} />

              {positions.length > 0 && (
                <>
                  <Controller
                    rules={{ required: true }}
                    control={control}
                    name="position_id"
                    render={({ field }) => (
                      <FormControl component="fieldset">
                        <FormLabel id="demo-radio-buttons-group-label">
                          Select your position
                        </FormLabel>

                        <RadioGroup
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        >
                          {positions.map((position) => (
                            <FormControlLabel
                              key={position.id}
                              value={position.id}
                              control={<Radio />}
                              label={position.name}
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                    )}
                  />
                  <ErrorMsg error={errors?.position_id?.message} />
                </>
              )}
              <TextField
                className={classnames(s.file, {
                  [s.errorBorder]: errors.image,
                })}
                error={errors.image}
                id="outlined-helperText"
                type="file"
                onClick={() => clearErrors("image")}
                {...register("image")}
              />
              {photo && <img width="100px" src={photo} alt="name" />}
              <ErrorMsg error={errors?.image?.message} />

              <Button status={!token} className={s.submitButton} type="submit">
                {token ? "Submit" : "Sign up"}
              </Button>
              <div className={s.wrapperErrorMsg}></div>
            </form>
          </>
        )}
        {success && (
          <>
            <Heading>User successfully registered</Heading>
            <div className={s.wrapper}>
              <img src={successImage} alt="success" />
            </div>
          </>
        )}
      </Container>
    </section>
  );
};
