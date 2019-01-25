import {history} from "./index";
import {userService} from "./services/UserService";

class RedirectService {
    redirect(requiredId: number) {
        userService
            .getCurrentUser()
            .then(user => {
                if (user.userId !== requiredId) {
                    if (user.userId === 1) {
                        history.push('/minSide');
                    } else if (user.userId === 2) {
                        history.push('/bedrift');
                    } else if (user.userId === 3) {
                        history.push('/kommune/' + user.munId);
                    } else if (user.userId === 4) {
                        history.push('/admin');
                    }
                }
            })
            .catch((error: Error) => {
                console.log(error);
                history.push('/');
            });
    }


}

export let redirectService = new RedirectService();