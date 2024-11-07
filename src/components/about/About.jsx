function About(props) {
    const { name, age, address } = props;
    return (
        <>
            <h1>Hi My name is {name}</h1>
            <p>I am {age} years old and live in {address}</p>
        </>
    )
}

export default About;
