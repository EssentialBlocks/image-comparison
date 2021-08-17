import ReactCompareImage from "react-compare-image";

const ReactCompareImageNew = ({ props }) => {
	console.log({ props });
	const { leftImage, rightImage } = props;
	return <ReactCompareImage leftImage={leftImage} rightImage={rightImage} />;
};

export default ReactCompareImageNew;
