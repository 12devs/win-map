import Drawer from 'react-native-drawer'
import Login from "./Login";

class Menu extends Component {
  closeControlPanel = () => {
    this._drawer.close()
  };
  openControlPanel = () => {
    this._drawer.open()
  };
  render () {
    return (
      <Drawer
        ref={(ref) => this._drawer = ref}
        content={<ControlPanel />}
      >
        <MainView />
      </Drawer>
    )
  }
})

export default Menu
