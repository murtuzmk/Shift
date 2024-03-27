import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import UserDataContext from "../context/UserDataContext";
import { useContext, useEffect, useState } from "react";

const CreateRAAccount = () => {
  const { createNewUser, createPassChangeTicket }: any =
    useContext(UserDataContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [passwordLink, setPasswordLink] = useState();
  const [newEmail, setNewEmail] = useState();

  const handleAccountSubmit = async (values: any, actions: any) => {
    const userInfo = await createNewUser(values.email, values.password);
    const userId = await userInfo[0];
    const email = await userInfo[1];
    const passwordLink = await createPassChangeTicket(await userId);
    setPasswordLink(passwordLink);
    setNewEmail(email);
    actions.setSubmitting(false);
  };

  useEffect(() => {
    if (passwordLink && newEmail) {
      onOpen();
    }
  }, [passwordLink, newEmail]);

  return (
    <>
      <Formik
        initialValues={{ email: "new" }}
        onSubmit={(values, actions) => {
          handleAccountSubmit(values, actions);
        }}
      >
        {(props) => (
          <Form>
            <Field name="email">
              {({ field, form }: any) => (
                <FormControl>
                  <FormLabel>email</FormLabel>
                  <Input {...field} placeholder="" />
                </FormControl>
              )}
            </Field>
            <Field name="password">
              {({ field, form }: any) => (
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input {...field} placeholder="" type="password" />
                </FormControl>
              )}
            </Field>
            <Button
              mt={4}
              colorScheme="teal"
              isLoading={props.isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Success</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Success! Here is the link for the user to change their password:{" "}
            <b>{passwordLink}</b>. Send them their email too: <b>{newEmail}</b>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateRAAccount;
