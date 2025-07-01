/**
 * Simple Universal Link Router for ICPC Menofia
 * Automatically handles ALL internal links with absolute paths!
 */

// Central link registry - paths without .md extensions for MkDocs
const LINKS = {
  // Coach profiles - ALL coaches from coaches.md
  'coach:amr_saud': '/community/coaches/#amr-saud',
  'coach:mahmoud_magdy': '/community/coaches/#mahmoud-magdy',
  'coach:mostafa_mounir_shehab': '/community/coaches/#mostafa-mounir-shehab',
  'coach:moamen_zakaria': '/community/coaches/#moamen-zakaria',
  'coach:nader_yehia': '/community/coaches/#nader-yehia',
  'coach:youssef_amer': '/community/coaches/#youssef-amer',
  'coach:mohamed_sameh': '/community/coaches/#mohamed-sameh',
  'coach:muhammad_eid': '/community/coaches/#muhammad-eid',
  'coach:belal_moawad': '/community/coaches/#belal-moawad',
  'coach:abdallah_ahmed': '/community/coaches/#abdallah-ahmed',
  'coach:youseef_seliem': '/community/coaches/#youseef-seliem',
  'coach:abdallah_selim': '/community/coaches/#abdallah-selim',
  'coach:tawfeek_shalash': '/community/coaches/#tawfeek-shalash',
  'coach:mohamed_khaled_saeed': '/community/coaches/#mohamed-khaled-saeed',
  'coach:ahmed_sakr': '/community/coaches/#ahmed-sakr',
  'coach:abdelrhman_sersawy': '/community/coaches/#abdelrhman-sersawy',
  'coach:ahmed_mousa': '/community/coaches/#ahmed-mousa',
  'coach:ameen_sakr': '/community/coaches/#ameen-sakr',
  'coach:ahmed_elsayed': '/community/coaches/#ahmed-elsayed',
  'coach:khaled_labeb': '/community/coaches/#khaled-labeb',
  'coach:abdelrhman_emad': '/community/coaches/#abdelrhman-emad',
  'coach:yomna_magdy': '/community/coaches/#yomna-magdy',
  'coach:mahmoud_reda': '/community/coaches/#mahmoud-reda',
  'coach:ebrahim_mordy': '/community/coaches/#ebrahim-mordy',
  'coach:ahmed_marouf': '/community/coaches/#ahmed-marouf',
  'coach:ibrahme_elhdad': '/community/coaches/#ibrahme-elhdad',
  'coach:ahmed_wageeh': '/community/coaches/#ahmed-wageeh',
  'coach:hossam_saber': '/community/coaches/#hossam-saber',
  'coach:maryam_abdelhady': '/community/coaches/#maryam_abdelhady',
  
  // Additional coaches found in sessions
  'coach:seifaldin_elabyad': '/community/coaches/#seifaldin-elabyad',
  'coach:yaseen_abdulghany': '/community/coaches/#yaseen-abdulghany',
  'coach:ziad_tabour': '/community/coaches/#ziad-tabour',
  'coach:ibrahem_elhdad': '/community/coaches/#ibrahme-elhdad',
  'coach:ameen_osama': '/community/coaches/#ameen-osama',
  'coach:senior_coach': '/community/coaches/#senior-coaches',
  
  // Legacy coach names for backward compatibility
  'coach:ahmed_mohamed': '/community/coaches/#abdelrhman-sersawy',
  'coach:mohamed_khaled': '/community/coaches/#mohamed-khaled-saeed',
  'coach:abdelrhman_mostafa': '/community/coaches/#mostafa-mounir-shehab',
  'coach:mohamed_hani': '/community/coaches/#muhammad-eid',
  'coach:abdelrhman_elhabal': '/community/coaches/#abdelrhman-emad',
  'coach:maryam_abdelhady': '/community/coaches/#yomna-magdy',
  'coach:menna_fathy': '/community/coaches/#yomna-magdy',
  
  // Community pages
  'page:home': '/',
  'page:coaches': '/community/coaches/',
  'page:about': '/community/about_us/',
  'page:join': '/community/join_us/',
  'page:contributions': '/community/contributions/',
  'page:community': '/community/',
  
  // Training pages
  'page:training': '/training/',
  'page:training_2025': '/training/2025/',
  'page:level1_2025': '/training/2025/level1_training/',
  'page:level2_2025': '/training/2025/level2_training/',
  'page:seniors_2025': '/training/2025/seniors/',
  'page:level1_2023': '/training/2023/Level1/',
  'page:newcomers_2023': '/training/2023/Newcommers/',
  
  // Training plan pages
  'page:newcomer_plan': '/training/plan/Newcommer_training/',
  'page:level1_plan': '/training/plan/Level1_training/',
  'page:level2_plan': '/training/plan/Level2_training/',
  'page:senior_plan': '/training/plan/Senior_training/',
  
  // Resources pages
  'page:resources': '/resources/',
  'page:faq': '/resources/FAQ/',
  'page:sessions': '/resources/sessions/',
  'page:general_sessions': '/resources/sessions/general/',
  'page:newcomer_sessions': '/resources/sessions/newcomer/',
  'page:level1_sessions': '/resources/sessions/level1/',
  'page:level2_sessions': '/resources/sessions/level2/',
  'page:senior_sessions': '/resources/sessions/senior/',
  
  // News pages
  'page:news': '/news/',
  'page:news_2025': '/news/2025_events/',
  'page:news_2024': '/news/2024_events/',
  'page:news_2023': '/news/2023_events/',
  'page:news_2022': '/news/2022_events/',
  'page:news_2021': '/news/2021_events/',
  'page:news_2020': '/news/2020_events/',
  
  // External links
  'external:vjudge_level1': 'https://vjudge.net/group/icpc-menofia-level1-2025',
  'external:vjudge_level2': 'https://vjudge.net/group/icpc-menofia-level2-2025',
  'external:vjudge_phase2': 'https://vjudge.net/group/phase-2',
  'external:discord': 'https://discord.gg/bdKQ3RSSxK',
  'external:facebook': 'https://www.facebook.com/ICPCMNF',
  'external:github': 'https://github.com/ICPC-Menofia',
  'external:github_website': 'https://github.com/ICPC-Menofia/icpc-menofia.github.io',
  'external:twitter': 'https://x.com/icpcmenofia',
  'external:codeforces': 'https://codeforces.com/profile/ICPC_Menofia',
  'external:telegram': 'https://t.me/+invC37P-pkA0NTY0',
  'external:youtube_tutorial': 'https://youtube.com/playlist?list=PLAw15AnTPFl_CS8sljvkNdf6WDf0LwHlM',
  
  // Missing page links
  'page:external': '/resources/FAQ/',  // Map to FAQ page for external links section
  
  // Missing coach aliases and corrections
  'coach:sersawy': '/community/coaches/#abdelrhman-sersawy',
  'coach:ahmed_wageh': '/community/coaches/#ahmed-wageeh',
  'coach:elhabal': '/community/coaches/#abdelrhman-emad',
  'coach:mahmoud_khaled': '/community/coaches/#mohamed-khaled-saeed',
  'coach:mohamed_yasser': '/community/coaches/#muhammad-eid',
  'coach:abdelrhman_elhabal': '/community/coaches/#abdelrhman-emad'
};

// Get absolute link - no more relative path calculation needed!
function getLink(linkKey) {
  const target = LINKS[linkKey];
  if (!target) {
    console.warn(`🔗 Link "${linkKey}" not found in LINKS object`);
    console.log(`Available keys:`, Object.keys(LINKS).filter(k => k.includes(linkKey.split(':')[0])));
    return '#';
  }
  
  console.log(`✅ Found link: ${linkKey} → ${target}`);
  return target;
}

// Check if URL is external
function isExternalLink(url) {
  return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:');
}

// Navigate to internal link properly
function navigateToInternal(url) {
  // Use location.href for proper browser history
  window.location.href = url;
}

// Process all data-link elements on the current page
function processDataLinks() {
  console.log('🔄 Processing data-link elements...');
  
  // Process all elements with data-link attribute
  document.querySelectorAll('[data-link]').forEach(element => {
    // Skip if already processed
    if (element.hasAttribute('data-link-processed')) {
      return;
    }
    
    const linkKey = element.getAttribute('data-link');
    const url = getLink(linkKey);
    const isExternal = isExternalLink(url);
    
    if (element.tagName === 'A') {
      element.href = url;
      // For external links, open in new tab
      if (isExternal) {
        element.target = '_blank';
        element.rel = 'noopener noreferrer';
      }
    } else {
      // For non-anchor elements (buttons, divs, etc.)
      element.onclick = (e) => {
        e.preventDefault();
        if (isExternal) {
          // Open external links in new tab
          window.open(url, '_blank', 'noopener,noreferrer');
        } else {
          // Navigate to internal links in same window for proper history
          navigateToInternal(url);
        }
      };
      // Add cursor pointer for clickable elements
      element.style.cursor = 'pointer';
    }
    
    // Mark as processed
    element.setAttribute('data-link-processed', 'true');
  });
  
  // Add keyboard accessibility to non-anchor elements
  document.querySelectorAll('[data-link]:not(a)').forEach(element => {
    if (element.hasAttribute('data-link-keyboard-processed')) {
      return;
    }
    
    element.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        element.click();
      }
    });
    
    // Make focusable
    if (!element.hasAttribute('tabindex')) {
      element.setAttribute('tabindex', '0');
    }
    
    // Mark as processed
    element.setAttribute('data-link-keyboard-processed', 'true');
  });
  
  console.log(`✅ Processed ${document.querySelectorAll('[data-link]').length} data-link elements`);
}

// Initial processing on page load
document.addEventListener('DOMContentLoaded', processDataLinks);

// Handle MkDocs Material instant navigation
// This fires when new content is loaded via AJAX
document.addEventListener('DOMContentLoaded', () => {
  // Check if MkDocs Material is being used
  if (typeof app !== 'undefined' && app.location$) {
    console.log('🎯 MkDocs Material instant navigation detected');
    
    // Subscribe to location changes (page navigation)
    app.location$.subscribe(() => {
      console.log('📄 Page changed, re-processing links...');
      
      // Small delay to ensure new content is rendered
      setTimeout(processDataLinks, 100);
    });
  } else {
    console.log('📝 Standard navigation - using DOMContentLoaded only');
  }
});

// Fallback: Also listen for hashchange and popstate events
window.addEventListener('hashchange', () => {
  setTimeout(processDataLinks, 100);
});

window.addEventListener('popstate', () => {
  setTimeout(processDataLinks, 100);
});

// Additional fallback: Mutation Observer to detect content changes
const observer = new MutationObserver((mutations) => {
  let shouldReprocess = false;
  
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList') {
      // Check if any added nodes contain data-link attributes
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.hasAttribute && node.hasAttribute('data-link')) {
            shouldReprocess = true;
          } else if (node.querySelector && node.querySelector('[data-link]')) {
            shouldReprocess = true;
          }
        }
      });
    }
  });
  
  if (shouldReprocess) {
    console.log('🔄 New data-link elements detected, re-processing...');
    setTimeout(processDataLinks, 50);
  }
});

// Start observing when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});

// Global helper function
window.getLink = getLink;

console.log('🚀 Universal link router loaded with instant navigation support!'); 