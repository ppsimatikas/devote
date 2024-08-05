export const LOCAL_API_URL = 'http://127.0.0.1:5001/devote-ba3e8/us-central1/path'
export const DEPLOYED_API_URL = 'https://path-mh5gjsn4xa-uc.a.run.app'

export const API_URL = process.env.REACT_APP_ENV === 'local' ? LOCAL_API_URL : DEPLOYED_API_URL
