import Alert from './alert';
import Button from './button';
import ButtonGroup from './button-group';
import Grid from './grid';
import Icon from './icon';
import Info from './info';
import Input from './input';
import Loading from './loading';
import VcNotification from './vc-notification';
var version = '0.1.0';

function install(Vue) {
  var components = [Alert, Button, ButtonGroup, Grid, Icon, Info, Input, Loading, VcNotification];
  components.forEach(function (item) {
    if (item.install) {
      Vue.use(item);
    } else if (item.name) {
      Vue.component(item.name, item);
    }
  });
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export { install, version, Alert, Button, ButtonGroup, Grid, Icon, Info, Input, Loading, VcNotification };
export default {
  install: install,
  version: version
};