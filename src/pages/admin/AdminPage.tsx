import { useNavigate } from "react-router-dom";
import { MainBox } from "../../components/MainBox";
import { PrimaryButtonSmall } from '../../components/PrimaryButton';

function AdminPage() {
    const navigate = useNavigate();

    return (
        <MainBox>
            <div className="">
                <h1>Admin</h1>
                <PrimaryButtonSmall text={"LP Reward Program"} onClick={() => {
                    navigate('/admin/reward');
                }}></PrimaryButtonSmall>
            </div>
        </MainBox>
    );
}

export default AdminPage;
