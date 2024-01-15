import DashboardLayout from "../features/dashboard/DashboardLayout";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import DashboardTableOperations from "../features/dashboard/DashboardTableOperations";
function Dashboard() {
  return (
    <Row>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <DashboardTableOperations />
      </Row>
      <DashboardLayout />
    </Row>
  );
}

export default Dashboard;
