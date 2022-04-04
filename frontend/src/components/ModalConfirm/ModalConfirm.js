import { Modal } from 'antd';
const { confirm } = Modal;

export function ShowConfirm({title, content, onOK}) {
  confirm({
    title,
    className: "modal-confirm",
    icon:  <img loading="eager" className="tiktak-animation" src='/exit.svg' width={130} alt='logo'/>,
    content,
    onOk() {
        onOK()
    },
    onCancel() {},
  });
}
export function ShowConfirmDelete({title, content, onOK}) {
  confirm({
    title,
    className: "modal-confirm",
    content,
    onOk() {
        onOK()
    },
    onCancel() {},
  });
}