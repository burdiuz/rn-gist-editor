import { connect } from 'react-redux';
import { getUserLogin } from 'src/store/user/selectors';
import { getProjectsList } from 'src/store/projects/selectors';
import { fetchList } from 'src/store/projects/actions';
import Projects from './Projects';

const mapStateToProps = (state) => ({
  userLogin: getUserLogin(state),
  list: getProjectsList(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchList: () => dispatch(fetchList()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Projects);
