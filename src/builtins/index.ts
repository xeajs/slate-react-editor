/** registry_builtins_modules */
import { Boot } from 'src'
import headingModule from './heading'
import imageModule from './image'
import linkModule from './link'
import paragraphModule from './paragraph'
import textModule from './text'

Boot.registryModules(...headingModule)
Boot.registryModules(textModule)
Boot.registryModules(paragraphModule)
Boot.registryModules(imageModule)
Boot.registryModules(linkModule)
