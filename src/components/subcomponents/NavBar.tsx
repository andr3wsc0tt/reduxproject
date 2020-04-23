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
                    to={`/groups`}
                    name='groups'
                >
                    Activities
                </Menu.Item>

                <Menu.Item
                    as={Link}
                    to={`/page1`}
                    name='otherpage'
                >
                    Another Page
                </Menu.Item>

                <Menu.Item
                    as={Link}
                    to={`/fsdsdffsdsdf23484h0rhw0e8rfbwne0fnbads0fshfb0p42jpias09idashj0dsa`}
                    name='otherpage'
                >
                    Broken Link Page
                </Menu.Item>
            </Menu>
        );
    }
}