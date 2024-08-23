export const updateError = (error, stateUpdate) => {
  stateUpdate(error);
  setTimeout(() => {stateUpdate('');
  }, 3000);
};

export const isValidForm = (formInfo, date, setError, errorStages, detailStage) => {
  if (!formInfo.projectName.trim() || formInfo.projectName.length === 0)
    return updateError('Invalid name of project.', setError);
  if (!formInfo.stages)
    return updateError(errorStages.stages||'Required to choice Stages of Shopdrawing.', setError);
  if (detailStage.stagesPODetails && !formInfo.stagesPODetails){
    updateError('Required to choice Stages -fromValdtn', setError)
    return false
  }
  if (!date)
    return updateError('Required to choice Date of Proccess.', setError);
  return true;
};