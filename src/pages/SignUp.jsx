import { useTranslation } from 'react-i18next';

function SignUp() {
  const { t } = useTranslation("global");

  return (
    <>
      <h1>{t("Translation.SignUp")}</h1>
    </>
  );
}

export default SignUp

/* import Translator from '../components/Translator';

function SignUp({ translation }) {
  return (
  <>
      <h1>{translation.SignUp}</h1>
  </>
  );
}

export default function SignUpTranslated() {
  return (
    <Translator>
      <SignUp />
    </Translator>
  );
} */
