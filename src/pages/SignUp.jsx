import Translator from '../components/Translator';

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
}
