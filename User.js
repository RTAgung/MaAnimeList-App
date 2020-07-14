export const types = {
  LOGIN: 'LOGIN',
}

export const actionCreators = {
  login: item => {
    return { type: types.LOGIN, payload: item }
  },
}

const initialState = {
  username: '',
}

export const reducer = (state = initialState, action) => {
  const { username } = state
  const { type, payload } = action

  switch (type) {
    case types.LOGIN: {
      return {
        ...state,
        username: [payload, username],
      }
    }
  }

  return state
}