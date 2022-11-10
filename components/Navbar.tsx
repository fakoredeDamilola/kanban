import { makeStyles } from "@material-ui/core"
import { AppStyleProps } from "../utils/types"


const style = makeStyles((theme: AppStyleProps ) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: theme.spacing(3),
        backgroundColor: theme.palette.background.default,
    },
}))

const Navbar = () => {
    const classes = style()
  return (
    <div>Navbar</div>
  )
}

export default Navbar