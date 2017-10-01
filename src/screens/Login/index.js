import { connect } from 'react-redux';
import { fetchUser } from 'src/store/user/actions';
import {
  onLoginStart,
  onLoginError,
  onLoginSuccess,
} from 'src/store/login/actions';
import { getAccessToken } from 'src/store/login/selectors';
import { getUserLogin } from 'src/store/user/selectors';
import Login from './Login';

const mapStateToProps = (state) => ({
  accessToken: getAccessToken(state),
  userLogin: getUserLogin(state),
});

const mapDispatchToProps = (dispatch) => ({
  onLoginStart: () => dispatch(onLoginStart()),
  onLoginError: (error) => dispatch(onLoginError(error)),
  onLoginSuccess: (data) => dispatch(onLoginSuccess(data)),
  fetchUser: () => dispatch(fetchUser()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
