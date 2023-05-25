import styled from "styled-components";
import { connect } from "react-redux";
import { signInAPI } from "../../actions";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import Loader from "../atoms/Loader";

const Login = (props) => {
  console.log(props)

  if(props.loading) return <Loader />
  return (
    <Container>
      {props.user && <Redirect to="/trifurcate" />}
      <Nav>
        <a href="/">
          <img src="/images/login-logo.svg" alt="" />
        </a>
        {/* <div>
          <Join>Join Now</Join>
          <SignIn>Sign In</SignIn>
        </div> */}
      </Nav>

      <Section>
        <Hero>
          <div>
          <h1>
            "Start Investing Now"<br></br> Invest In India's Emerging Startups
          </h1>
            <Form>
              <Google onClick={() => props.signIn()}>
                <img src="/images/google.svg" width={'20px'} /> Sign in with Google
              </Google>

            <Link to="/signup" style={{color:'black', textDecoration:'none'}}>
              <Button>
                Create an Account
              </Button>
            </Link>
            </Form>

          </div>
          <img src="/images/login-hero.svg" alt="" />

        </Hero>


      </Section>
    </Container>
  );
};

const Container = styled.div`
  padding: 0px;
`;

const Button=styled.div`
  background-color:gold;
  padding:15px 0px;
  width:100%;
  border-radius:200px;
  text-align:center;
  border:2px solid black;
`
const Nav = styled.nav`
  max-width: 1128px;
  margin: auto;
  padding: 12px 0 16px 0;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  flex-wrap: nowrap;

  & > a {
    width: 135px;
    height: 34px;

    @media (max-width: 768px) {
      padding: 0 5px;
    }
  }
`;

const Join = styled.a`
  font-size: 16px;
  padding: 10px 12px;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.6);
  margin-right: 12px;
  font-weight: 600;
  border-radius: 4px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
    color: rgba(0, 0, 0, 0.9);
    text-decoration: none;
    cursor: pointer;
  }
`;

const SignIn = styled.a`
  box-shadow: inset 0 0 0 1px #e6a106;
  color: #e6a106;
  border-radius: 24px;
  transition-duration: 167ms;
  font-size: 16px;
  font-weight: 600;
  line-height: 40px;
  padding: 12px 23px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0);

  &:hover {
    background-color: rgba(230, 161, 6, 0.15);
    color: #e6a106;
    text-decoration: none;
    cursor: pointer;
    box-shadow: inset 0 0 0 2px #e6a106;
  }
`;

const Section = styled.section`
  display: flex;
  align-content: start;
  padding-bottom: 138px;
  position: relative;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1128px;
  align-items: center;
  margin: auto;

  @media (max-width: 768px) {
    margin: auto;
    min-height: 0px;
  }
`;

const Hero = styled.div`
  width: 100%;
  display:flex;
  align-items:center;
  h1 {
    padding-bottom: 0;
    width: 70%;
    font-size: 56px;
    color: #e6a106;
    background-color: none;
    font-weight: 300;
    line-height: 70px;

    @media (max-width: 768px) {
      text-align: center;
      font-size: 20px;
      width: 100%;
      width: 100%;
      line-height: 2;
    }
  }

  img {
    width: 400px;
    height: 500px;
    border-radius: 28px;

    @media (max-width: 768px) {
      top: 230px;
      width: initial;
      position: initial;
      height: initial;
      border-radius: 28px;
    }
  }
`;

const Form = styled.div`
  width: 300px;
  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const Google = styled.button`
  display: flex;
  width:100%;
  justify-content: center;
  background-color: #fff;
  align-items: center;
  height: 56px;
  margin:20px 0px;
  border-radius: 28px;
  box-shadow: inset 0 0 0 1px rgba(0 0 0 / 60%),
    inset 0 0 0 2px rgb(0 0 0 / 0%) inset 0 0 0 1px rgb(0 0 0 / 0%);
  vertical-align: middle;
  z-index: 0;
  transition-duration: 167ms;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.6);

  &:hover {
    background-color: rgba(207, 207, 207, 0.25);
    color: rgba(0, 0, 0, 0.75);
    cursor: pointer;
  }

  img {
    width: 30px;
    height: 30px;
    border-radius: 28px;

    @media (max-width: 768px) {
      top: 230px;
      width: initial;
      position: initial;
      height: initial;
      border-radius: 28px;
    }
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
    loading: state.userState.loading,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signIn: () => dispatch(signInAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
