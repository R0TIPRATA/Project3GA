import Navbar from "../components/Navbar";
import AddSignUpForm from "../components/form/SignUpForm";

const SignUp = () => {
  return ( 
  <>
    <Navbar />
    <div className="drawer drawer-end">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content ">
        <div className="loginPage h-whole bg-orange-100 flex-col">
          <main className="flex mx-auto gap-8 justify-center">
            <AddSignUpForm />
          </main>
        </div>
      </div>
    </div>
  </> );
}
 
export default SignUp;