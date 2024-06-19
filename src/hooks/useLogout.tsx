import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { clearToken } from '../services/instances';
import { useAuthStore } from '../store';

const useLogout = () => {

    const router = useRouter();
    const auth = useAuthStore();

    const handleLogout = () => {
        auth.unsetUser()
        Cookies.remove("Authorization");
        clearToken();
        localStorage.clear();
        router.push('auth/sign-in');
    }

    return handleLogout;
}

export default useLogout