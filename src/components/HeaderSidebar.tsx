import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.svg";

interface Props {
  children: React.ReactNode
}

const Header: React.FC<Props> = (props: Props) => {
  const headerMenus = [
    {
      id: 1,
      name: "Bewohner"
    },
    {
      id: 2,
      name: "Teams"
    },
    {
      id: 3,
      name: "Mitarbeiter"
    }
  ];

  const menus = [
    {
      id: 1,
      name: "Schedule",
      sub: []
    },
    {
      id: 2,
      name: "Protocols",
      sub: [
        {
          id: 1,
          name: "Infochannel",
          href: '/'
        }
      ]
    },
    {
      id: 3,
      name: "Settings",
      sub: [
        { id: 1, name: "Process", href: '/process' },
        { id: 2, name: "Registration", href: '/' }
      ]
    }
  ];

  const [mainMenu, setMainMenu] = useState<string>("Teams");
  const [state, setState] = useState<any>({});

  const location = window.location.pathname;

  const mainMenuHandler = (value: string): any => {
    setMainMenu(value);
  };

  const sidebMenuHandler = (value: any): any => {
    setState(value);
  };

  useEffect(() => {
    menus.forEach((menu) => {
      menu.sub.forEach((su) => {
        if (su.href === location) {
          setState(menu);
        }
      });
    });
  }, []);

  return (
    <div>
      <div className="header container">
        <img src={Logo} alt={Logo} className="header-logo" />
        <div className="header-menu">
          {headerMenus.map((el) => (
            <p
              key={el.id}
              className={
                mainMenu === el.name
                  ? "header-menu-item header-menu-item__active"
                  : "header-menu-item"
              }
              onClick={() => mainMenuHandler(el.name)}
            >
              {el.name}
            </p>
          ))}
        </div>
      </div>
      <div className="header-sidebar-content">
        <div className="header-sidebar">
          {menus.map((menu) => (
            <div className="container" key={menu.id}>
              <Link to={(menu.sub.length > 0) ? menu.sub[0].href : '/'}>
                <p
                  className={
                    state.id === menu.id
                      ? `header-sidebar-item header-sidebar-main-item`
                      : `header-sidebar-item`
                  }
                  onClick={() => sidebMenuHandler(menu)}
                >
                  {menu.name}
                </p>
              </Link>
              {menu.sub.map((sub) => {
                return (
                  state.id === menu.id && (
                    <Link to={sub.href} key={sub.id}>
                      {location === sub.href
                        ? (
                        <p className="header-sidebar-item-active">
                          <p className="header-sidebar-item__sub-active"></p>
                          <p className="header-sidebar-item header-sidebar-item__sub">
                            {sub.name}
                          </p>
                        </p>
                          )
                        : (
                        <p className="header-sidebar-item-active">
                          <p className="header-sidebar-item__sub-dactive"></p>
                          <p className="header-sidebar-item">{sub.name}</p>
                        </p>
                          )}
                    </Link>
                  )
                );
              })}
            </div>
          ))}
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default Header;