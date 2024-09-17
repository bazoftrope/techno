// components/DynamicButton.js
import styles from './styles.module.css'
function DynamicButton({ text, onClick }) {
  return (
    <div
      className={styles.dynamic}
      onClick={onClick}
    >
      {text}
    </div>
  );
}

export default DynamicButton;
