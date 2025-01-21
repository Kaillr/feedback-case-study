import logo from '../assets/images/logo_protector_no.svg';

export default function Header() {
    const mainNav = [
        {
            name: "Forsikringstaker",
            url: "https://protectorforsikring.no/forsikringstaker/"
        },
        {
            name: "Megler",
            url: "https://protectorforsikring.no/megler/"
        },
        {
            name: "Investor",
            url: "https://protectorforsikring.no/investor/"
        },
        {
            name: "Meld Skade",
            url: "https://claims-at-net.protectorforsikring.no/nor/nb",
            alternativeStyle: true
        },
    ]

    const topNav = [
        {
            name: "OM OSS",
            url: "https://protectorforsikring.no/om-oss/"
        },
        {
            name: "VÅRE FORSIKRINGERE",
            url: "https://protectorforsikring.no/vare-forsikringer/"
        },
        {
            name: "KARRIERE",
            url: "https://protectorforsikring.no/karriere/"
        },
        {
            name: "KONTAKT",
            url: "https://protectorforsikring.no/kontakt/"
        },
        {
            name: "ENGLISH",
            url: "#"
        },
    ]

    return (
        <header>
            <div className="top">
                <div className='container'>
                    <nav>
                        <ul>
                            {topNav.map((navItem, index) => (
                                <li key={index}>
                                    <a href={navItem.url}>{navItem.name}</a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
            <div className="bottom">
                <div className='container'>
                    <a href="https://protectorforsikring.no/">
                        <img src={logo} alt="logo_protector_no" />
                    </a>
                    <nav>
                        <ul>
                            {mainNav.map((navItem, index) => (
                                <li key={index}>
                                    <a
                                        href={navItem.url}
                                        className={navItem.alternativeStyle ? 'alternative-style' : ''}
                                    >
                                        {navItem.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}