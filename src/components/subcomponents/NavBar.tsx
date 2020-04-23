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
                    to={`/`}
                    name='home'
                >
                    Home
                </Menu.Item>


                <Menu.Item
                    as={Link}
                    to={`/page2`}
                    name='otherpage'
                >
                   Edit Profile
                </Menu.Item>

                <Menu.Item
                    as={Link}
                    to={`/page3`}
                    name='otherpage'
                >
                    Logout
                </Menu.Item>
            </Menu>
        );
    }
}