import { Button, chakra, VStack } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormikInput from "../../components/FormikInput";
import { useSignInMutation } from "../../hooks/UseSignInMutation";

const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
});

const initialValues = {
    email: "",
    password: "",
};

const SignInForm = () => {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async () => {
            await signIn();
        
        },
    });

    const { mutateAsync: signIn, isPending } = useSignInMutation(
        formik.values.email,
        formik.values.password
    );

    return (
        <chakra.form minW={"20vw"} onSubmit={formik.handleSubmit}>
            <VStack alignItems={"center"} spacing={5}>
                <FormikInput
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.errors.email}
                    touched={formik.touched.email}
                />
                <FormikInput
                    name="password"
                    label="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.errors.password}
                    touched={formik.touched.password}
                    type="password"
                />
                <Button
                    isDisabled={isPending}
                    isLoading={isPending}
                    type="submit"
                    bgColor={"primary"}
                    w="full"
                >
                    Ingresar
                </Button>
            </VStack>
        </chakra.form>
    );
};
export default SignInForm;