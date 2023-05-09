import { Dna} from "react-loader-spinner";

const Spinner = (props) => {
  return (
    <>
      <h2>{props.text}</h2>
      <Dna
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </>
  );
};

export default Spinner;
