import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction,
  getFirebaseAdmin,
} from "next-firebase-auth";
import AdminNavbar from "../../components/navbars/adminNavbar";
import Link from "next/link";

const Dashboard = () => {
  return (
    <div>
      <AdminNavbar></AdminNavbar>
      <main>
        <ul className="space-y-4">
          <Link href="/admin/register/participant">
            <a>
              <li className="py-8 bg-gray-50 rounded-full m-8 pl-4 font-semibold text-lg">
                Register New Users
              </li>
            </a>
          </Link>
          <Link href="/admin/register/manager">
            <a>
              <li className="py-8 bg-gray-50 rounded-full m-8 pl-4 font-semibold text-lg">
                Register Crisis Managers
              </li>
            </a>
          </Link>
        </ul>
      </main>
    </div>
  );
};

const Loader = () => {};

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  LoaderComponent: Loader,
})(Dashboard);
