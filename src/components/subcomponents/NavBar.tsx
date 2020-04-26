import * as React from 'react';
import { Menu, Dropdown, Input } from 'semantic-ui-react';
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

                <Menu.Item>
                        
                    <Dropdown text="Groups">
                        <Dropdown.Menu>
                        <Dropdown.Item text="Group 1" />
                        <Dropdown.Item text="Group 2" />
                        <Dropdown.Item text="Group 3" />
                        </Dropdown.Menu>
                    </Dropdown>
         
                </Menu.Item>

              <Menu.Item>
                <Dropdown text="Class Mates">
                        <Dropdown.Menu>
                        <Dropdown.Item text="Andrew" />
                        <Dropdown.Item text="Charles" />
                        <Dropdown.Item text="Cai" />
                        <Dropdown.Item text="Trina" />
                        <Dropdown.Item text="Mohammad" />
                        </Dropdown.Menu>
                </Dropdown>
              </Menu.Item>

               <Menu.Item>
                    <Input className='icon' icon='search' placeholder='Search...' />
                </Menu.Item>              
              </Menu>
            
        );
    }
}


