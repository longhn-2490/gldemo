export const REGEX_PASSWORD =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%^&*()_+{}\[\]:;<>,.?~=`/\\|\"'-])[A-Za-z0-9!@#\$%^&*()_+{}\[\]:;<>,.?~=`/\\|\"'-]{8,}$/;
export const REGEX_EMOJI =
  /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g;
