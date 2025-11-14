# api/library.py
from fastapi import APIRouter, HTTPException, Depends, BackgroundTasks
from fastapi.responses import RedirectResponse
from typing import List, Optional, Dict
import json
import os
import logging

from app.core.auth import get_current_user
from app.core.firebase_service import firebase_service
from app.models.schemas import UserInfo
from app.config.settings import settings

logger = logging.getLogger(__name__)
router = APIRouter()


# ============================================
# DOMAIN NAME TO FOLDER NAME MAPPING
# ============================================

DOMAIN_NAME_MAPPING = {
    "newsmedia": "News_and_Media",
    "sports": "Sports",
    "elections": "Elections",
    "agriculture": "Agriculture",
    "healthcare": "Healthcare",
    "education": "Education",
    "traffic": "Traffic",
    "economy": "Economy",
    "finance": "Finance",
    "weather": "Weather",
    "census": "Census",
    "crimelaw": "Crime_Law",
    "covid19": "COVID-19",
    "transport": "Transport",
    "environment": "Environment",
    "cultureheritage": "Culture_Heritage",
    "tourism": "Tourism",
    "waterresources": "Water_Resources",
    "electricity": "Electricity",
    "jobsskills": "Jobs_Skills",
    "politics": "Politics",
    "socialmedia": "Social_Media",
    "ecommerce": "E-commerce",
    "banking": "Banking",
    "realestate": "Real_Estate",
    "energy": "Energy",
    "judiciary": "Judiciary",
    "welfareschemes": "Welfare_Schemes",
    "foodnutrition": "Food_Nutrition",
    "startups": "Startups",
    "msmes": "MSMEs",
    "industrialstats": "Industrial_Stats",
    "animalhusbandry": "Animal_Husbandry",
    "fisheries": "Fisheries",
    "tribaldata": "Tribal_Data",
    "womenchildren": "Women_Children",
    "migration": "Migration",
    "housing": "Housing",
    "infrastructure": "Infrastructure",
    "telecom": "Telecom",
    "bankingfraud": "Banking Fraud",
    "aviation": "Aviation",
    "maritime": "Maritime",
    "labourlaws": "Labour Laws",
    "forestwildlife": "Forest & Wildlife",
    "disastermanagement": "Disaster Management",
    "sciencetech": "Science & Tech",
    "spacemissions": "Space Missions",
    "cybersecurity": "Cybersecurity",
    "urbandevelopment": "Urban Development",
    "publictransport": "Public Transport",
    "digitalindia": "Digital India",
    "publicgrievances": "Public Grievances",
    "rti": "RTI",
    "digitalpayments": "Digital Payments",
    "ruraldevelopment": "Rural Development",
    "judicialreforms": "Judicial Reforms",
    "pmgatishakti": "PM Gati Shakti",
    "cooperatives": "Cooperatives",
    "fertilizers": "Fertilizers",
    "transportaccidents": "Transport Accidents",
    "publicdistribution": "Public Distribution",
    "statebudgets": "State Budgets",
    "academicresearch": "Academic Research",
    "customsexcise": "Customs & Excise",
    "fairsfestivals": "Fairs & Festivals",
    "dronedata": "Drone Data",
    "itservices": "IT Services",
    "climatechange": "Climate Change",
    "animalshelters": "Animal Shelters",
    "privateschools": "Private Schools",
    "mobileappsusage": "Mobile Apps Usage",
    "miningminerals": "Mining & Minerals",
    "wasteland": "Wasteland",
    "startupincubators": "Startup Incubators",
    "cybercrime": "Cybercrime",
    "ngodata": "NGO Data",
    "patentdata": "Patent Data",
    "highereducation": "Higher Education",
    "animalcensus": "Animal Census",
    "recycling": "Recycling",
    "postaldata": "Postal Data",
    "handloomtextiles": "Handloom & Textiles",
    "elearning": "E-learning",
    "statetransport": "State Transport",
    "riverlinking": "River Linking",
    "datalocalization": "Data Localization",
    "medicalresearch": "Medical Research",
    "vaccinationstats": "Vaccination Stats",
    "trafficviolations": "Traffic Violations",
    "courtjudgements": "Court Judgements",
    "energyefficiency": "Energy Efficiency",
    "livelihoodprograms": "Livelihood Programs",
    "airporttraffic": "Airport Traffic",
    "voterawareness": "Voter Awareness",
}


# ============================================
# GOOGLE DRIVE FUNCTIONS
# ============================================

def load_folder_ids() -> Dict[str, str]:
    """Load Google Drive folder IDs from JSON file"""
    try:
        folder_ids_file = os.path.join(
            os.path.dirname(os.path.dirname(os.path.dirname(__file__))),
            'data',
            'folder_ids.json'
        )
        
        with open(folder_ids_file, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        logger.error(f"Error loading folder_ids.json: {e}")
        return {}


# Load folder IDs once at startup
GDRIVE_FOLDER_IDS = load_folder_ids()


def load_domains_metadata():
    """Load domains from domains.json file"""
    try:
        domains_file = os.path.join(
            os.path.dirname(os.path.dirname(os.path.dirname(__file__))),
            'data',
            'domains.json'
        )
        
        with open(domains_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
            return data['domains']
    except Exception as e:
        logger.error(f"Error loading domains.json: {e}")
        return []


def get_gdrive_folder_id(domain_id: str) -> Optional[str]:
    """Get Google Drive folder ID for a domain"""
    # Get folder name from domain ID
    folder_name = DOMAIN_NAME_MAPPING.get(domain_id)
    
    if not folder_name:
        logger.warning(f"No folder name mapping for domain: {domain_id}")
        return None
    
    # Get folder ID from folder_ids.json
    folder_id = GDRIVE_FOLDER_IDS.get(folder_name)
    
    if not folder_id:
        logger.warning(f"No folder ID found for: {folder_name}")
    
    return folder_id


def get_gdrive_download_link(folder_id: str) -> str:
    """Generate Google Drive folder download link"""
    return f"https://drive.google.com/drive/folders/{folder_id}?usp=sharing"


def calculate_domain_stats(domain_id: str) -> dict:
    """
    For Google Drive, we can't calculate stats without API
    Return placeholder data with Google Drive info
    """
    folder_id = get_gdrive_folder_id(domain_id)
    
    return {
        "file_count": "Available on Google Drive" if folder_id else 0,
        "total_size": 0,
        "total_size_readable": "See Google Drive" if folder_id else "Not Available",
        "files": [],
        "gdrive_folder_id": folder_id,
        "is_available": folder_id is not None
    }


# ============================================
# API ENDPOINTS
# ============================================

@router.get("/domains")
async def get_all_domains(current_user: UserInfo = Depends(get_current_user)):
    """Get list of all 99 domains with Google Drive links"""
    try:
        domains = load_domains_metadata()
        
        # Enrich with Google Drive info
        enriched_domains = []
        for domain in domains:
            stats = calculate_domain_stats(domain['id'])
            enriched_domains.append({
                **domain,
                **stats
            })
        
        logger.info(f"User {current_user.email} accessed library domains")
        
        return {
            "domains": enriched_domains,
            "total": len(enriched_domains),
            "categories": list(set(d['category'] for d in domains))
        }
        
    except Exception as e:
        logger.error(f"Error fetching domains: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/domain/{domain_id}")
async def get_domain_detail(
    domain_id: str,
    current_user: UserInfo = Depends(get_current_user)
):
    """Get detailed information about a specific domain"""
    try:
        domains = load_domains_metadata()
        domain = next((d for d in domains if d['id'] == domain_id), None)
        
        if not domain:
            raise HTTPException(status_code=404, detail="Domain not found")
        
        # Get Google Drive info
        stats = calculate_domain_stats(domain_id)
        
        return {
            **domain,
            **stats
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching domain {domain_id}: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/download/zip/{domain_id}")
async def download_domain_as_zip(
    domain_id: str,
    background_tasks: BackgroundTasks,
    current_user: UserInfo = Depends(get_current_user)
):
    """
    Redirect user to Google Drive folder for download
    """
    try:
        # Get domain info
        domains = load_domains_metadata()
        domain = next((d for d in domains if d['id'] == domain_id), None)
        
        if not domain:
            raise HTTPException(status_code=404, detail="Domain not found")
        
        # Get Google Drive folder ID
        folder_id = get_gdrive_folder_id(domain_id)
        
        if not folder_id:
            raise HTTPException(
                status_code=404,
                detail=f"Google Drive folder not found for {domain['name']}"
            )
        
        # Generate download link
        drive_url = get_gdrive_download_link(folder_id)
        
        # Track download
        background_tasks.add_task(
            track_download,
            current_user.google_id,
            domain_id,
            "google_drive_link",
            0
        )
        
        logger.info(f"User {current_user.email} accessed Google Drive link for {domain_id}")
        
        # Redirect to Google Drive folder
        return RedirectResponse(url=drive_url)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error generating Google Drive link: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/download/files/{domain_id}")
async def download_domain_files(
    domain_id: str,
    background_tasks: BackgroundTasks,
    current_user: UserInfo = Depends(get_current_user)
):
    """
    Same as ZIP download - redirect to Google Drive folder
    """
    return await download_domain_as_zip(domain_id, background_tasks, current_user)


@router.get("/stats")
async def get_library_stats(current_user: UserInfo = Depends(get_current_user)):
    """Get overall library statistics"""
    try:
        domains = load_domains_metadata()
        
        available_domains = 0
        
        for domain in domains:
            folder_id = get_gdrive_folder_id(domain['id'])
            if folder_id:
                available_domains += 1
        
        return {
            "total_domains": len(domains),
            "available_domains": available_domains,
            "total_files": "Available on Google Drive",
            "total_size": "See Google Drive",
            "categories": len(set(d['category'] for d in domains))
        }
        
    except Exception as e:
        logger.error(f"Error fetching library stats: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# ============================================
# TRACKING HELPER
# ============================================

def track_download(google_id: str, domain_id: str, download_type: str, file_count: int):
    """Track download in Firebase"""
    try:
        from datetime import datetime
        from google.cloud import firestore
        
        # Update domain download count
        domain_ref = firebase_service.db.collection('library_downloads').document(domain_id)
        domain_doc = domain_ref.get()
        
        if domain_doc.exists:
            domain_ref.update({
                'download_count': firestore.Increment(1),
                'last_downloaded': datetime.utcnow()
            })
        else:
            domain_ref.set({
                'domain_id': domain_id,
                'download_count': 1,
                'first_downloaded': datetime.utcnow(),
                'last_downloaded': datetime.utcnow()
            })
        
        # Track user download
        firebase_service.db.collection('user_downloads').add({
            'user_id': google_id,
            'domain_id': domain_id,
            'download_type': download_type,
            'file_count': file_count,
            'timestamp': datetime.utcnow()
        })
        
        logger.info(f"Tracked download: {google_id} -> {domain_id} ({download_type})")
        
    except Exception as e:
        logger.error(f"Error tracking download: {e}")
