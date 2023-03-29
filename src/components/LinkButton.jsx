import { Link } from "react-router-dom"

const LinkButton = ({ href, text}) => {
  return ( 
    <>
      <Link to={href} role="button" className="btn">
        {text}
      </Link>
    </>
  )
}   

export default LinkButton;
