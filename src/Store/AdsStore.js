import {observable, action, computed, decorate, toJS} from 'mobx'
import api from './../services/api'

class AdsStore {
    
    @observable nome = 'jairo'
    @observable valor = 0
    @observable condicoesPgto = []
    @observable freteGratis = false
    @observable descricao = ''
    @observable idProduto = ''
    @observable dadosAdicionais = {}
    @observable listAds = []
    @observable productItem = {}

    @computed get getListAds() {
        return toJS(this.listAds)
    }

    @action fetchAds = async () => {

        const response = await api.get('ads/get-all')
        const {data} = response

        // console.log('getAds RESPONSE', data)

        this.listAds = data

        return {
            ...data
        }
    }

    @action getProductKeyById = async (productId) => {

        console.log('getProductKeyById', productId)

        const response = await api.post('products/ProductKeybyId', productId)
        const {data} = response

        // console.log('getAds RESPONSE', data)

        this.productItem = data

        return {
            ...data
        }
    }


}

export default new AdsStore()