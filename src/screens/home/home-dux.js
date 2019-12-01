export const HOME = {
  LOAD: "HOME_LOAD",
  SUCCESS: "HOME_LOAD_SUCCESS",
  PROGRAM_SELECT: "HOME_PROGRAM_SELECT",
  FAIL: "HOME_LOAD_FAIL"
};

const initialState = {
  headerLabel: "Give Recognition",
  recognitionList: [],
  externalLinks: []
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case HOME.SUCCESS:
      console.log("homeReducer ", HOME.SUCCESS);
      const {
        headerLabel,
        recognitionList,
        externalLinks
      } = action.response.data;
      return {
        ...state,
        status: true,
        headerLabel,
        recognitionList: recognitionList.list,
        externalLinks
      };
    case HOME.PROGRAM_SELECT: {
      return {
        ...state,
        selectedProgram: action.selectedProgram
      };
    }
    default:
      return state;
  }
};

export default homeReducer;
