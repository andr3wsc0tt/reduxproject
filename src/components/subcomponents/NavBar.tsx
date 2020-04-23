import * as React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export interface INavBarProps {
}

export default class NavBar extends React.Component<INavBarProps> {
    public render() {
        return (
            <Menu>
                <Menu.Item
                    as={Link}
                    to={`/`} /*Will be home the profile page? */
                    name='home'
                >
                    Home
                </Menu.Item>


                <Menu.Item
                    as={Link}
                    to={`/EditProfilePage`}
                    name='EditProfilePage'
                >
                   Edit Profile
                </Menu.Item>

                <Menu.Item
                    as={Link}
                    to={`/LogOut`}
                    name='LogOut'
                >
                    Logout
                </Menu.Item>
            </Menu>
        );
    }
}