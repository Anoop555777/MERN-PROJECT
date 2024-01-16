import Heading from "./Heading";
function Empty({ resourceName }) {
  return <Heading as="h3">No {resourceName} could be found.</Heading>;
}

export default Empty;
