import { useAuth0 } from "@auth0/auth0-react";
import {
  Button,
  ChakraProvider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import NavbarApp from "./components/NavbarApp";
import Sidebar from "./components/Sidebar";
import { useContext, useEffect } from "react";
import UserDataContext from "./context/UserDataContext";
import { Field, Form, Formik } from "formik";

function App() {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { submitOnboardingData, setOnboarding, getOnboarding }: any =
    useContext(UserDataContext);

  useEffect(() => {
    user &&
      (async () => {
        let onboarded = await getOnboarding(user.sub);
        if (!onboarded) {
          await setOnboarding(user.sub, false);
        }
        if (!onboarded) {
          onOpen();
        }
      })();
  }, [user]);

  const handleOnboardingSubmit = async (values: any, actions: any) => {
    const result = await submitOnboardingData(user?.sub, values);
    await setOnboarding(user?.sub, true);
    console.log(`get onboarding: ${await getOnboarding(user?.sub)}`);
    actions.setSubmitting(false);
    onClose();
    location.reload();
  };

  if (isLoading) {
    return <h1>Loading ...</h1>;
  }
  return (
    <ChakraProvider>
      {isAuthenticated && user ? (
        <div className="h-full flex flex-col">
          <NavbarApp />
          <div className="flex flex-1">
            <Sidebar />
            <Outlet context={{ user }} />
          </div>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Why, hello there! 👋</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                It seems you are a new user. We would like to collect some data
                from you. You can't change this later (for now).
                <Formik
                  initialValues={{ name: user.name, role: "ra" }}
                  onSubmit={(values, actions) => {
                    handleOnboardingSubmit(values, actions);
                  }}
                >
                  {(props) => (
                    <Form>
                      <Field name="name">
                        {({ field, form }: any) => (
                          <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input {...field} placeholder="" />
                          </FormControl>
                        )}
                      </Field>
                      <Field name="role">
                        {({ field, form }: any) => (
                          <FormControl>
                            <FormLabel>Role</FormLabel>
                            <Select {...field} placeholder="">
                              <option value="ra">Resident Assistant</option>
                              <option value="rea">
                                Resident Education Assistant
                              </option>
                              <option value="rec">
                                Resident Education Coordinator
                              </option>
                            </Select>
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
              </ModalBody>
              <ModalFooter></ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      ) : (
        <div className="h-full flex flex-col gap-6 justify-center items-center">
          <h1 className="font-bold text-4xl">
            You have to be logged in to see that.
          </h1>
          <Button colorScheme="blue" onClick={() => navigate("/")} size="lg">
            Go home
          </Button>
        </div>
      )}
    </ChakraProvider>
  );
}

export default App;