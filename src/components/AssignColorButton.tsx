import { useState } from 'react';
import { toast } from 'react-toastify';
import useSelectedColorStore from '../store/selectedColorStore';
import useSelectedMbtiStore from '../store/selectedMbtiStore';
import checkMbti from '../util/checkMbti';
import TypePasswordModal from './modal/TypePasswordModal';
import usePassword from '../store/passwordStore';
import useAssignMbtiColorMutation from '../hooks/useAssignMbtiColorMutation';
import usePatchMbtiColorMutation from '../hooks/usePatchMbtiColorMutation';
import { FunType } from '../types/funType';

const AssignColorButton = ({ type, id }: FunType) => {
  const [isOpen, setIsOpen] = useState(false);

  const { selectedMbti } = useSelectedMbtiStore();
  const { selectedColor } = useSelectedColorStore();
  const { userPassword } = usePassword();

  const assignMbtiColorMutation = useAssignMbtiColorMutation();
  const patchMbtiColorMutation = usePatchMbtiColorMutation();

  const handleAssignColor = () => {
    if (checkMbti(selectedMbti)) {
      setIsOpen(true);
    } else {
      toast.error('mbti 항목을 모두 선택해주세요');
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    const mergedMbtiValue = `${selectedMbti.EI || ''}${selectedMbti.SN || ''}${selectedMbti.TF || ''}${selectedMbti.JP || ''}`;
    if (id) {
      patchMbtiColorMutation.mutate({
        id,
        mbti: mergedMbtiValue,
        colorCode: selectedColor,
        password: userPassword,
      });
    } else {
      assignMbtiColorMutation.mutate({
        mbti: mergedMbtiValue,
        colorCode: selectedColor,
        password: userPassword,
      });
    }
  };

  return (
    <>
      <button
        onClick={handleAssignColor}
        type="button"
        className="flex px-[22px] py-[22px] justify-center items-center rounded-[16px] bg-[#464E5E] text-[24px] font-bold text-white"
      >
        {type === 'Assign' ? '컬러 등록' : '컬러 수정'}
      </button>
      {isOpen && <TypePasswordModal closeModal={handleCloseModal} />}
    </>
  );
};
export default AssignColorButton;
