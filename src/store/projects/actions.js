import { getCurrentUser } from 'src/store/user/selectors';

export const PROJECTS_FETCH_START = 'projectsFetchStart';
export const PROJECTS_FETCH_COMPLETE = 'projectsFetchComplete';
export const PROJECTS_FETCH_FAILURE = 'projectsFetchFailure';

export const onProjectsFetchStart = () => ({
  type: PROJECTS_FETCH_START,
});

export const onProjectsFetchComplete = (list) => ({
  type: PROJECTS_FETCH_COMPLETE,
  list,
});

export const onProjectsFetchFailure = (error) => ({
  type: PROJECTS_FETCH_FAILURE,
  error,
});

const gistFilesToProject = (gistFiles) => (key) => {
  const gistFile = gistFiles[key];
  const { filename, language } = gistFile;
  return {
    name: filename,
    language,
    gistFile,
  };
};

const gistToProject = (item) => {
  const { id, comments, files, html_url, description, created_at, updated_at } = item;
  const fileNames = Object.keys(files).sort();
  return {
    id,
    title: fileNames[0] || '',
    description,
    comments,
    files: fileNames.map(gistFilesToProject(files)),
    gistId: id,
    href: html_url,
    gist: item,
    createdDate: Date.parse(created_at),
    updatedDate: Date.parse(updated_at),
  };
};

export const fetchList = () => (dispatch, getState) => {
  const state = getState();
  const user = getCurrentUser(state);
  dispatch(onProjectsFetchStart());
  return user.listGists()
    .then(({ data }) => {
      if (!data) {
        return Promise.reject(new Error('Sever returned nothing.'));
      }

      const list = data.map(gistToProject);
      dispatch(onProjectsFetchComplete(list));
      return data;
    })
    .catch((error) => {
      dispatch(onProjectsFetchFailure(error));
      return Promise.reject(error || new Error('Unknown Error'));
    });
};
