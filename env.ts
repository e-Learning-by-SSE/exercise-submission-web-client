declare global {
    interface Window {
      env: any
    }
  }
  
  // change with your own variables
  type EnvType = {
    REACT_APP_BACKEND: string,
    REACT_APP_SUBMISSIONSERVER : string,
    REACT_APP_COURSEID : string,
    REACT_APP_CLIENTID : string,
    REACT_APP_AUTHORITY : string,
    REACT_APP_REDIRECTURI : string,
  }
  export const env: EnvType = { ...process.env, ...window.env }