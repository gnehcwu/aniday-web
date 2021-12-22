import {
  Menu,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  Text,
  Flex,
  useColorMode,
  MenuButton,
  IconButton,
  Tooltip,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import { SunIcon, MoonIcon, AtSignIcon } from '@chakra-ui/icons';
import { ReactComponent as Logo } from '../logo.svg';
import { langs, SETTING_ACTIONS, useSetting, useSettingDispatch } from '../states/useSetting';

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { lang: currentLang } = useSetting();

  const dispatch = useSettingDispatch();

  const logoWidth = useBreakpointValue({ base: 27, md: 41 });

  const isCurrent = lang => {
    return lang.toLocaleLowerCase() === currentLang.toLocaleLowerCase();
  };

  const setLang = lang => {
    dispatch({ type: SETTING_ACTIONS.UPDATE_LANG, payload: lang });
  };

  return (
    <Flex direction="row" marginLeft="auto" align="center" width="100%">
      <Flex direction="column" alignItems="center" gap="2">
        <Logo width={logoWidth} sx={{ marginRight: 'auto' }} />
        <Text
          fontSize={{ base: 'xs', md: 'lg' }}
          fontWeight="700"
          bgGradient="var(--chakra-colors-bg-gradient)"
          bgClip="text"
        >
          Anime Calendar
        </Text>
      </Flex>
      <Flex marginLeft="auto" gap={{ base: 2, md: 4 }}>
        <Tooltip label={`Toggle theme to ${colorMode === 'light' ? 'dark' : 'light'}`}>
          <IconButton
            arial-label="Toggle theme"
            _hover={{ bgGradient: 'var(--chakra-colors-bg-gradient)' }}
            _active={{ bgGradient: 'var(--chakra-colors-bg-gradient)' }}
            icon={useColorModeValue(<MoonIcon />, <SunIcon />)}
            onClick={toggleColorMode}
          />
        </Tooltip>
        <Menu>
          <Tooltip label="Change language">
            <MenuButton
              as={IconButton}
              arial-label="Toggle language"
              icon={<AtSignIcon />}
              _hover={{ bgGradient: 'var(--chakra-colors-bg-gradient)' }}
              _active={{ bgGradient: 'var(--chakra-colors-bg-gradient)' }}
            />
          </Tooltip>
          <MenuList>
            <MenuOptionGroup defaultValue={currentLang}>
              {langs.map(lang => (
                <MenuItemOption
                  key={lang}
                  value={lang.toLocaleLowerCase()}
                  color={isCurrent(lang) ? 'pink.400' : 'gray.500'}
                  onClick={() => setLang(lang.toLocaleLowerCase())}
                >
                  {lang}
                </MenuItemOption>
              ))}
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
}
