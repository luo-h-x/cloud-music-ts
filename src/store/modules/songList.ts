import api from '@/api/music';
import store from '@/store/store';
import {
  VuexModule, Module, Mutation, Action, getModule,
} from 'vuex-module-decorators';

interface SongL {
  name: string
  id: number
  url?: string

}

interface SongI {
  currentIndex: number
  ids: string 
  songs: SongL[]
}

@Module({
  dynamic: true, namespaced: true, name: 'SongList', store,
})
class SongList extends VuexModule {
  public songList: SongL[] = []
  public currentIndex = 0

  @Action({ commit: 'querySongsM', rawError: true })
  public async querySongsA(options: SongI) {
    const data = await api.getSong(options.ids)
    options.songs = data.data.songs
    options.songs.forEach((item: SongL) => {
      item.url = 'https://music.163.com/song/media/outer/url?id=' + item.id
    })
    return options
  }

  @Mutation
  public querySongsM(data: SongI) {
    this.currentIndex = data.currentIndex
    this.songList = data.songs
  }

  // 上一首
  @Mutation
  prevM() {
    this.currentIndex > 0
      ? (this.currentIndex -= 1)
      : (this.currentIndex = this.songList.length - 1)
  }

  // 下一首
  @Mutation
  nextM() {
    this.currentIndex < this.songList.length - 1
      ? (this.currentIndex += 1)
      : (this.currentIndex = 0)
  }

}

export default getModule(SongList)