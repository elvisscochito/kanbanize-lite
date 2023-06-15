import { useTranslation } from 'react-i18next';

function SignUp() {
  const { t } = useTranslation("global");

  return (
    <>
      <h1>{t("Translation.SignUp")}</h1>
    </>
  );
}

export default SignUp;
