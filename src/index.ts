type Hanlde = () => Promise<string>

const fullname = 'Trần Phước Long'

const handleClick: Hanlde = () => Promise.resolve(fullname)

handleClick().then(console.log)
