// src/components/modal.ts
import closeIconUrl from '../../assets/icons/Close.svg?url';
import './Modal.scss'

export interface ModalProps {
  isOpen: boolean;
  floorNum: number;
  onClose: () => void;
  children?: HTMLElement[]; // array of chart/container elements
}

export function Modal({
  isOpen,
  floorNum,
  onClose,
  children = [],
}: ModalProps): HTMLElement {
  // <section class="modal-container">...
  const modalEl = document.createElement('section');
  modalEl.classList.add('modal-container');
  if (isOpen) modalEl.classList.add('open');

  // Icon wrapper
  const iconWrapper = document.createElement('div');
  iconWrapper.classList.add('icon-wrapper');

  const title = document.createElement('h1');
  title.innerText = `Floor No.${floorNum} Analytics`;
  iconWrapper.appendChild(title);

  const closeImg = document.createElement('img');
  closeImg.src = closeIconUrl;
  closeImg.alt = 'Close';
  closeImg.addEventListener('click', onClose);
  iconWrapper.appendChild(closeImg);

  modalEl.appendChild(iconWrapper);

  // Charts container
  const chartsWrapper = document.createElement('div');
  chartsWrapper.classList.add('all-charts-wrapper');
  children.forEach((child) => chartsWrapper.appendChild(child));
  modalEl.appendChild(chartsWrapper);

    // Outer overlay wrapper
  const overlay = document.createElement("div");
  overlay.classList.add("modal-overlay");
  if (isOpen) overlay.classList.add("open");

  // Close on outside click
  overlay.addEventListener("click", (e) => {
    const target = e.target as Node;
    if (!modalEl.contains(target)) {
      onClose();
    }
  });

  overlay.appendChild(modalEl)

  return overlay;
}
