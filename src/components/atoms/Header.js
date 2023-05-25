import styled from "styled-components";
import { connect, useDispatch, useSelector } from "react-redux";
import { getAllUsers, setSelectedUser, signOutAPI } from "../../actions";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { Redirect } from "react-router-dom";
const Header = (props) => {
  const [query, setQuery] = useState('')
  // const [users,setUsers]=useState([])
  const allUsers = useSelector(state => state.userState.allUsers || [])
  const [results, setResults] = useState([])
  const [isDisplay, setDisplay] = useState(false)
  const dispatch = useDispatch()
  useEffect(e => {
    dispatch(getAllUsers())
    // eslint-disable-next-line
  }, [])

  useEffect(data => {
    setDisplay(true)
    var searchResults = allUsers.filter(e => e.name.toLowerCase().includes(query.toLowerCase().trim()))
    setResults(searchResults)
    // eslint-disable-next-line
  }, [query])
  return (
    <Container>
      {!props.user && <Redirect to="/" />}
      <Content>
        <Logo>
          <a href="/home">
            <img src="/images/home-logo.svg" alt="" />
          </a>
        </Logo>

        <Search>
          <div>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search" />
          </div>
          <SearchIcon>
            <img src="/images/search-icon.svg" alt="" />
          </SearchIcon>
        </Search>
        {(isDisplay) ? (query.length && allUsers.length) ? <SearchResults>
          {
            results.length ? results.map(user => {
              return <SearchItem >
                {user.name}
                <SearchItemEmail>{user.email}</SearchItemEmail>
                <Link to={`/profile`} onClick={() => {
                  dispatch(setSelectedUser(user))
                  console.log(user)
                  setDisplay(false)
                  setQuery('')
                }} style={{
                  fontSize: '10px',
                  textDecoration: 'none'
                }}>View Profile</Link>
              </SearchItem>
            }) : 'No Results Found'
          }
        </SearchResults> : '' : ''}


        <Nav>
          <NavListWrap>
            <NavList className={(props.isActive === 'Home') ? 'active' : ''}>
              <Link to="/home">
                <Image alt="" src="/images/nav-home.svg" />
                <span style={{
                  color: (props.isActive === 'Home') ? 'black' : ''
                }}>Home</span>
              </Link>
            </NavList>
            <NavList className={(props.isActive === 'Connections') ? 'active' : ''}>
              <Link to="/connection">
                <img src="/images/nav-network.svg" alt="" />
                <span>Connections</span>
              </Link>
            </NavList>
            <NavList></NavList>
            <NavList className={(props.isActive === 'Messaging') ? 'active' : ''}>
              <Link to="/messaging">
                <img alt="" src="/images/nav-messaging.svg" />
                <span>Messaging</span>
              </Link>
            </NavList>
            <NavList className={(props.isActive === 'Notifications') ? 'active' : ''}>
              <Link to="/notifications">
                <img src="/images/nav-notifications.svg" alt="l,cd," />
                <span>Notifications</span>
              </Link>
            </NavList>

            <User>
              <a href="#kmm">
                {props.user && props.user.photoURL ? (
                  <img src={props.user.photoURL} alt="" />
                ) : (
                  <img src="/images/user.svg" alt="user" />
                )}
                <span>
                  Me <img src="/images/down-icon.svg" alt="" />
                </span>
              </a>

              <SignOut>
                <Link onClick={() => {
                  props.signOut();
                  props.setIdentity(3);
                }}>Sign Out</Link>
                <Link to={`/profile`} onClick={() => dispatch(setSelectedUser(props.user))}>
                  Profile
                </Link>
              </SignOut>
            </User>

            <Settings>
              <a href="#kcmdm">
                <img src="/images/nav-work.svg" alt="" />
                <span>
                  Settings
                  <img src="/images/down-icon.svg" alt="" />
                </span>
              </a>
            </Settings>
          </NavListWrap>
        </Nav>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  background-color: #ffffff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  left: 0;
  padding: 0 24px;
  top: 0;
  position: fixed;
  width: 100vw;
  z-index: 100;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  min-height: 100%;
  max-width: 1128px;
`;

const Logo = styled.span`
  margin-right: 8px;
  font-size: 0px;
`;

const Image = styled.img`
  stroke:black;
`

const Search = styled.div`
  opacity: 1;
  flex-grow: 1;
  position: relative;

  & > div {
    max-width: 280px;

    input {
      border: none;
      box-shadow: none;
      background-color: #e6a106;
      border-radius: 2px;
      color: rgba(0, 0, 0, 0.9);
      width: 218px;
      padding: 0 8px 0 40px;
      line-height: 1.75;
      font-weight: 400;
      font-size: 14px;
      height: 34px;
      border-color: #dce6f1;
      vertical-align: text-top;
    }
  }
`;

const SearchIcon = styled.div`
  width: 40px;
  position: absolute;
  z-index: 1;
  top: 10px;
  left: 2px;
  border-radius: 0 2px 2px 0;
  margin: 0;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchResults = styled.div`
  position:absolute;
  top:50px;
  left:100px;
  width:300px;
  height:300px;
  overflow-y:scroll;
  background-color:white;
  border:.5px solid lightgray;
  padding:10px
`

const SearchItem = styled.div`
  padding:10px;
  text-align:left;
  cursor:pointer
  &:hover{
    scale:1.02;
    transition:0.5s

  }
`
const SearchItemEmail = styled.p`
    opacity:0.5;
    color:gray;
    font-size:12px
`
const Nav = styled.nav`
  margin-left: auto;
  display: block;

  @media (max-width: 768px) {
    position: fixed;
    left: 0;
    bottom: 0;
    background: #ffffff;
    width: 100%;
  }
`;

const NavListWrap = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  list-style-type: none;

  .active {
    span:after {
      content: "";
      transform: scaleX(1);
      border-bottom: 2px solid var(--white, #ffffff);
      bottom: 0;
      left: 0;
      position: absolute;
      transition: transform 0.2s ease-in-out;
      width: 100%;
      border-color: rgba(0, 0, 0, 0.9);
    }
  }
`;

const NavList = styled.li`
  display: flex;
  align-items: center;

  a {
    align-items: center;
    background: transparent;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    font-weight: 400;
    justify-content: center;
    line-height: 1.5;
    min-height: 42px;
    min-width: 88px;
    position: relative;
    text-decoration: none;

    span {
      color: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
    }

    @media (max-width: 768px) {
      min-width: 70px;
    }
  }

  &:hover,
  &:active {
    a {
      span {
        color: rgba(0, 0, 0, 0.9);
      }
    }
  }
`;

const SignOut = styled.div`
  cursor: pointer;
  position: absolute;
  top: 45px;
  background: #ffffff;
  border-radius: 0 0 5px 5px;
  width: 100px;
  box-shadow: 2px 3px 5px -2px rgba(110, 104, 104, 0.75);
  height: 80px;
  transition-duration: 167ms;
  text-align: center;
  display: none;
`;

const User = styled(NavList)`
  a > svg {
    padding-top: 5px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }

  a > img {
    width: 24px;
    height: 24px;
    padding-top: 5px;
    border-radius: 50%;
  }

  span {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  &:hover {
    ${SignOut} {
      display:flex;
      flex-direction:column;
    }
  }
`;

const Settings = styled(User)`
  border-left: 1px solid rgba(0, 0, 0, 0.08);
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOutAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
