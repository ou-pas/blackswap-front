import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { getBunnySpecialContract } from 'utils/contractHelpers'

export const BULL_NFT = 11
export const HICCUP_NFT = 10

const useGetBullHiccupClaimableStatus = () => {
  const bunnySpecialContract = getBunnySpecialContract()
  const [hasChecked, setHasChecked] = useState(false)
  const [claimables, setClaimables] = useState({
    [BULL_NFT]: false,
    [HICCUP_NFT]: false,
  })
  const { account } = useWeb3React()

  useEffect(() => {
    const checkClaimableStatus = async () => {
      const [isBullClaimable, isHiccupClaimable] = (await bunnySpecialContract.canClaimMultiple(account, [BULL_NFT, HICCUP_NFT])) as boolean[]
      setClaimables({
        [BULL_NFT]: isBullClaimable,
        [HICCUP_NFT]: isHiccupClaimable,
      })
      setHasChecked(true)
    }

    if (account) {
      checkClaimableStatus()
    }
  }, [account, setClaimables, setHasChecked, bunnySpecialContract])

  return {
    isSomeClaimable: Object.values(claimables).some((status) => status === true),
    isBullClaimable: claimables[BULL_NFT],
    isHiccupClaimable: claimables[HICCUP_NFT],
    hasChecked,
  }
}

export default useGetBullHiccupClaimableStatus