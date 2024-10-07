import Container from "@/app/components/Container";
import ManageCustomersClient from "./ManageCustomersClient";
import getUsers from "@/actions/getUsers";
import getCurrentUser from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";

const ManageCustomers = async () => {
    // For the sake of simplicity, we need to get all users :D
    const customers = await getUsers()
    const currentUser = await getCurrentUser()

    if (!currentUser || currentUser.role !== "ADMIN") {
        return <NullData title="Oops! Access denied" />;
    }

    return <div className="pt-8">
        <Container>
            <ManageCustomersClient customers={customers} />
        </Container>
    </div>;
}

export default ManageCustomers;