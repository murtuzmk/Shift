import Button from "../components/Button";

const Landing = () => {
  return (
    <main className="bg-gray-400 h-screen flex flex-col justify-center items-center space gap-4">
      <h1 className="text-9xl font-bold">Welcome to Shift!</h1>
      <p className="text-4xl font-medium">The best app for RA scheduling!</p>
      <div className="flex justify-between mt-8 gap-8 ">
        <Button>Log in</Button>
        <Button>Sign up</Button>
      </div>
    </main>
  );
};

export default Landing;
