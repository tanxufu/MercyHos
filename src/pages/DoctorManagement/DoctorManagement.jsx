import DoctorDetail from '../../components/DoctorDetail';
import DoctorForm from '../../components/DoctorForm/DoctorForm';
import DoctorTable from '../../components/DoctorTable/DoctorTable';
import AdminLayout from '../../layouts/AdminLayout/Admin';

function DoctorManagenment() {
    return (
        <AdminLayout>
            <h1>Doctor Management</h1>
            <DoctorTable />
            <DoctorForm/>
            <DoctorDetail/>
        </AdminLayout>
    );
}

export default DoctorManagenment;
